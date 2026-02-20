

// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto'); // generowanie OTP

// // Tymczasowa funkcja wysyłki OTP – wyświetla w konsoli
// async function sendOtp(login, otp) {
//    console.log(`[OTP DEV] ${login}: ${otp}`); // terminal
//   // Prawdziwa wysyłka email odkomentuj poniżej, gdy będziesz miał SMTP
//   /*
//   const nodemailer = require('nodemailer');
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: parseInt(process.env.SMTP_PORT),
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: `"FlowGastro" <${process.env.SMTP_USER}>`,
//     to,
//     subject: "Twój kod weryfikacyjny",
//     text: `Twój kod OTP to: ${otp} (ważny 10 minut)`,
//   });
//   */

  
// }



// // ================= REGISTER =================
// // exports.register = async (req, res) => {
// //   const { login, password, name, position, birthDate, phone } = req.body;

// //   if (!login || !password || !name || !position || !birthDate || !phone) {
// //     return res.status(400).json({ error: 'Brak danych' });
// //   }

// //   const exists = await User.findOne({ login });
// //   if (exists) return res.status(400).json({ error: 'Login już istnieje' });

// //   const otp = crypto.randomInt(100000, 999999).toString();

// //   const user = new User({
// //     login,
// //     name,
// //     position,
// //     birthDate: new Date(birthDate),
// //     phone,
// //     password: await bcrypt.hash(password, 10),
// //     role: 'ADMIN',
// //     permissions: {
// //       canAddSuppliers: true,
// //       canAddProducts: true,
// //       readOnly: false
// //     },
// //     otp,
// //     otpExpires: new Date(Date.now() + 10 * 60 * 1000),
// //   });

// //   await user.save();
// //   user.owner = user._id;
// //   await user.save();

// //   // 🔹 Wyślij OTP (do konsoli w dev)
// //   sendOtp(login, otp);

// //   // 🔹 Zwróć OTP do frontu tylko w dev
// //   res.status(201).json({ requireOtp: true, otp }); 
// // };


// exports.register = async (req, res) => {
//   try {
//     const { login, password, name, position, birthDate, phone } = req.body;
//     if (!login || !password || !name || !position || !birthDate || !phone) {
//       return res.status(400).json({ error: 'Brak danych' });
//     }

//     const exists = await User.findOne({ login });
//     if (exists) return res.status(400).json({ error: 'Login już istnieje' });

//     const otp = crypto.randomInt(100000, 999999).toString();

//     const user = new User({
//       login,
//       name,
//       position,
//       birthDate: new Date(birthDate),
//       phone,
//       password: await bcrypt.hash(password, 10),
//       role: 'ADMIN',
//       permissions: { canAddSuppliers: true, canAddProducts: true, readOnly: false },
//       otp,
//       otpExpires: new Date(Date.now() + 10*60*1000),
//     });

//     await user.save();
//     user.owner = user._id;
//     await user.save();

//     sendOtp(login, otp);
//     res.status(201).json({ requireOtp: true, otp });

//   } catch (err) {
//     console.error('[REGISTER ERROR]', err);
//     res.status(500).json({ error: err.message });
//   }
// };


// // ================= LOGIN =================
// exports.login = async (req, res) => {
//   const { login, password, deviceId } = req.body;

//   const user = await User.findOne({ login });
//   if (!user) return res.status(401).json({ error: 'Błąd logowania' });

//   const ok = await bcrypt.compare(password, user.password);
//   if (!ok) return res.status(401).json({ error: 'Błąd logowania' });

//   // jeśli urządzenie zaufane, daj token od razu
//   const trusted = user.trustedDevices.some(d => d.deviceId === deviceId);
//   if (trusted) {
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         owner: user.owner,
//         role: user.role,
//         permissions: user.permissions,
//         name: user.name,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );
//     return res.json({ token });
//   }

//   // jeśli nie zaufane → OTP
//   const otp = crypto.randomInt(100000, 999999).toString();
//   user.otp = otp;
//   user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
//   await user.save();

//   sendOtp(login, otp);

//   res.json({ requireOtp: true, otp }); // 🔹 zwracamy OTP do frontu
// };

// // ================= VERIFY OTP =================
// exports.verifyOtp = async (req, res) => {
//   const { login, otp, trustDevice, deviceId } = req.body;

//   const user = await User.findOne({ login });
//   if (!user) return res.status(401).json({ error: 'Błąd' });

//   if (!user.otp || user.otp !== otp || user.otpExpires < new Date()) {
//     return res.status(401).json({ error: 'Zły kod' });
//   }

//   user.otp = null;
//   user.otpExpires = null;

//   if (trustDevice && deviceId) {
//     // 🔹 dodajemy urządzenie do zaufanych
//     user.trustedDevices.push({ deviceId });
//   }

//   await user.save();

//   const token = jwt.sign(
//     {
//       userId: user._id,
//       owner: user.owner,
//       role: user.role,
//       permissions: user.permissions,
//       name: user.name,
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: '1d' }
//   );

//   res.json({ token });
// };



const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Funkcja wysyłki OTP – dev vs prod
async function sendOtp(toEmail, otp) {
  if (process.env.NODE_ENV === 'production') {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"FlowGastro" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: "Twój kod weryfikacyjny",
        text: `Twój kod OTP to: ${otp} (ważny 10 minut)`,
      });

      console.log(`🔹 OTP wysłany na ${toEmail}`);
    } catch (e) {
      console.error("Błąd wysyłki OTP:", e);
    }
  } else {
    console.log(`[OTP DEV] ${toEmail}: ${otp}`);
  }
}


// ================= RESEND OTP =================
exports.resendOtp = async (req, res) => {
  try {
    const { login } = req.body;
    const user = await User.findOne({ login });
    if (!user) return res.status(404).json({ error: "Użytkownik nie istnieje" });

    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOtp(login, otp);

    res.json({ success: true, otp: process.env.NODE_ENV === 'development' ? otp : undefined });
  } catch (err) {
    console.error("[RESEND OTP ERROR]", err);
    res.status(500).json({ error: err.message });
  }
};



// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { login, password, name, position, birthDate, phone } = req.body;
    if (!login || !password || !name || !position || !birthDate || !phone) {
      return res.status(400).json({ error: 'Brak danych' });
    }

    const exists = await User.findOne({ login });
    if (exists) return res.status(400).json({ error: 'Login już istnieje' });

    const otp = crypto.randomInt(100000, 999999).toString();

    const user = new User({
      login,
      name,
      position,
      birthDate: new Date(birthDate),
      phone,
      password: await bcrypt.hash(password, 10),
      role: 'ADMIN',
      permissions: { canAddSuppliers: true, canAddProducts: true, readOnly: false },
      otp,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    await user.save();
    user.owner = user._id;
    await user.save();

    // wysyłka OTP
    await sendOtp(login, otp);

    res.status(201).json({ requireOtp: true, otp: process.env.NODE_ENV === 'development' ? otp : undefined });

  } catch (err) {
    console.error('[REGISTER ERROR]', err);
    res.status(500).json({ error: err.message });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  const { login, password, deviceId } = req.body;

  const user = await User.findOne({ login });
  if (!user) return res.status(401).json({ error: 'Błąd logowania' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Błąd logowania' });

  const trusted = user.trustedDevices.some(d => d.deviceId === deviceId);
  if (trusted) {
    const token = jwt.sign({
      userId: user._id,
      owner: user.owner,
      role: user.role,
      permissions: user.permissions,
      name: user.name,
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.json({ token });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendOtp(login, otp);

  res.json({ requireOtp: true, otp: process.env.NODE_ENV === 'development' ? otp : undefined });
};

// ================= VERIFY OTP =================
exports.verifyOtp = async (req, res) => {
  const { login, otp, trustDevice, deviceId } = req.body;

  const user = await User.findOne({ login });
  if (!user) return res.status(401).json({ error: 'Błąd' });

  if (!user.otp || user.otp !== otp || user.otpExpires < new Date()) {
    return res.status(401).json({ error: 'Zły kod' });
  }

  user.otp = null;
  user.otpExpires = null;

  if (trustDevice && deviceId) {
    user.trustedDevices.push({ deviceId });
  }

  await user.save();

  const token = jwt.sign({
    userId: user._id,
    owner: user.owner,
    role: user.role,
    permissions: user.permissions,
    name: user.name,
  }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({ token });
};
