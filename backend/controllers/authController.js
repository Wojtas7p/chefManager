
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');

// /* ====================== SMTP CHECK ====================== */
// function assertEnv() {
//   const required = [
//     'SMTP_HOST',
//     'SMTP_PORT',
//     'SMTP_USER',
//     'SMTP_PASS',
//     'JWT_SECRET',
//   ];

//   for (const key of required) {
//     if (!process.env[key]) {
//       console.error(`❌ BRAK ENV: ${key}`);
//       throw new Error(`Brak zmiennej środowiskowej: ${key}`);
//     }
//   }
// }

// /* ====================== SEND OTP ====================== */
// async function sendOtp(toEmail, otp) {
//   console.log('📨 [OTP] START');
//   console.log('➡️ email:', toEmail);
//   console.log('➡️ otp:', otp);

//   assertEnv();

//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: false,
//     requireTLS: true,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   try {
//     await transporter.verify();
//     console.log('✅ SMTP verify OK');
//   } catch (err) {
//     console.error('❌ SMTP VERIFY FAILED', err);
//     throw new Error('SMTP verify failed');
//   }

//   try {
//     const info = await transporter.sendMail({
//       from: `"FlowGastro" <${process.env.SMTP_USER}>`,
//       to: toEmail,
//       subject: 'Kod weryfikacyjny FlowGastro',
//       text: `Twój kod OTP: ${otp}\nWażny 10 minut.`,
//     });

//     console.log('✅ EMAIL SENT:', info.response);
//   } catch (err) {
//     console.error('❌ SENDMAIL ERROR:', err);
//     throw new Error('Email nie został wysłany');
//   }
// }

// /* ====================== REGISTER ====================== */
// exports.register = async (req, res) => {
//   try {
//     console.log('🟢 REGISTER', req.body.login);

//     const { login, password, name, position, birthDate, phone } = req.body;
//     if (!login || !password) {
//       return res.status(400).json({ error: 'Brak danych' });
//     }

//     if (await User.findOne({ login })) {
//       return res.status(400).json({ error: 'Login już istnieje' });
//     }

//     const otp = crypto.randomInt(100000, 999999).toString();

//     const user = await User.create({
//       login,
//       password: await bcrypt.hash(password, 10),
//       name,
//       position,
//       birthDate,
//       phone,
//       role: 'ADMIN',
//       otp,
//       otpExpires: new Date(Date.now() + 10 * 60 * 1000),
//       trustedDevices: [],
//     });

//     await sendOtp(login, otp);

//     res.status(201).json({
//       requireOtp: true,
//       otp: process.env.NODE_ENV === 'development' ? otp : undefined,
//     });

//   } catch (err) {
//     console.error('❌ REGISTER ERROR', err);
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ====================== LOGIN ====================== */
// exports.login = async (req, res) => {
//   try {
//     console.log('🟢 LOGIN', req.body.login);

//     const { login, password, deviceId } = req.body;
//     const user = await User.findOne({ login });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: 'Błąd logowania' });
//     }

//     if (user.trustedDevices.some(d => d.deviceId === deviceId)) {
//       return res.json({
//         token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
//       });
//     }

//     const otp = crypto.randomInt(100000, 999999).toString();
//     user.otp = otp;
//     user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
//     await user.save();

//     await sendOtp(login, otp);

//     res.json({
//       requireOtp: true,
//       otp: process.env.NODE_ENV === 'development' ? otp : undefined,
//     });

//   } catch (err) {
//     console.error('❌ LOGIN ERROR', err);
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ====================== VERIFY OTP ====================== */
// exports.verifyOtp = async (req, res) => {
//   try {
//     const { login, otp, trustDevice, deviceId } = req.body;
//     console.log('🟢 VERIFY OTP', login, otp);

//     const user = await User.findOne({ login });

//     if (!user || user.otp !== otp || user.otpExpires < new Date()) {
//       return res.status(401).json({ error: 'Zły kod OTP' });
//     }

//     user.otp = null;
//     user.otpExpires = null;

//     if (trustDevice && deviceId) {
//       user.trustedDevices.push({ deviceId });
//     }

//     await user.save();

//     res.json({
//       token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
//     });

//   } catch (err) {
//     console.error('❌ VERIFY OTP ERROR', err);
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ====================== RESEND OTP ====================== */
// exports.resendOtp = async (req, res) => {
//   try {
//     console.log('🟢 RESEND OTP', req.body.login);

//     const user = await User.findOne({ login: req.body.login });
//     if (!user) return res.status(404).json({ error: 'Użytkownik nie istnieje' });

//     const otp = crypto.randomInt(100000, 999999).toString();
//     user.otp = otp;
//     user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
//     await user.save();

//     await sendOtp(user.login, otp);

//     res.json({ success: true });

//   } catch (err) {
//     console.error('❌ RESEND OTP ERROR', err);
//     res.status(500).json({ error: err.message });
//   }
// };


const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid'); // <- zamiast crypto.randomUUID

/* ====================== SMTP CHECK ====================== */
function assertEnv() {
  const required = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'JWT_SECRET',
  ];

  for (const key of required) {
    if (!process.env[key]) {
      console.error(`❌ BRAK ENV: ${key}`);
      throw new Error(`Brak zmiennej środowiskowej: ${key}`);
    }
  }
}

/* ====================== SEND OTP ====================== */
async function sendOtp(toEmail, otp) {
  console.log('📨 [OTP] START');
  console.log('➡️ email:', toEmail);
  console.log('➡️ otp:', otp);

  assertEnv();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log('✅ SMTP verify OK');
  } catch (err) {
    console.error('❌ SMTP VERIFY FAILED', err);
    throw new Error('SMTP verify failed');
  }

  try {
    const info = await transporter.sendMail({
      from: `"FlowGastro" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: 'Kod weryfikacyjny FlowGastro',
      text: `Twój kod OTP: ${otp}\nWażny 10 minut.`,
    });

    console.log('✅ EMAIL SENT:', info.response);
  } catch (err) {
    console.error('❌ SENDMAIL ERROR:', err);
    throw new Error('Email nie został wysłany');
  }
}

/* ====================== REGISTER ====================== */
exports.register = async (req, res) => {
  try {
    console.log('🟢 REGISTER', req.body.login);

    const { login, password, name, position, birthDate, phone } = req.body;
    if (!login || !password) return res.status(400).json({ error: 'Brak danych' });
    if (await User.findOne({ login })) return res.status(400).json({ error: 'Login już istnieje' });

    const otp = crypto.randomInt(100000, 999999).toString();

    const user = await User.create({
      login,
      password: await bcrypt.hash(password, 10),
      name,
      position,
      birthDate,
      phone,
      role: 'ADMIN',
      otp,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000),
      trustedDevices: [],
    });

    await sendOtp(login, otp);

    res.status(201).json({
      requireOtp: true,
      otp: process.env.NODE_ENV === 'development' ? otp : undefined,
    });
  } catch (err) {
    console.error('❌ REGISTER ERROR', err);
    res.status(500).json({ error: err.message });
  }
};

/* ====================== LOGIN ====================== */
exports.login = async (req, res) => {
  try {
    console.log('🟢 LOGIN', req.body.login);

    const { login, password, deviceId } = req.body;
    const user = await User.findOne({ login });

    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: 'Błąd logowania' });

    if (deviceId && user.trustedDevices.some(d => d.deviceId === deviceId)) {
      return res.json({ token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }) });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOtp(login, otp);

    res.json({ requireOtp: true, otp: process.env.NODE_ENV === 'development' ? otp : undefined });
  } catch (err) {
    console.error('❌ LOGIN ERROR', err);
    res.status(500).json({ error: err.message });
  }
};

/* ====================== VERIFY OTP ====================== */
exports.verifyOtp = async (req, res) => {
  try {
    const { login, otp, trustDevice, deviceId } = req.body;
    console.log('🟢 VERIFY OTP', login, otp);

    const user = await User.findOne({ login });
    if (!user || user.otp !== otp || user.otpExpires < new Date()) return res.status(401).json({ error: 'Zły kod OTP' });

    user.otp = null;
    user.otpExpires = null;

    if (trustDevice && deviceId) {
      user.trustedDevices.push({ deviceId: deviceId || uuidv4() });
    }

    await user.save();

    res.json({ token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }) });
  } catch (err) {
    console.error('❌ VERIFY OTP ERROR', err);
    res.status(500).json({ error: err.message });
  }
};

/* ====================== RESEND OTP ====================== */
exports.resendOtp = async (req, res) => {
  try {
    console.log('🟢 RESEND OTP', req.body.login);

    const user = await User.findOne({ login: req.body.login });
    if (!user) return res.status(404).json({ error: 'Użytkownik nie istnieje' });

    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOtp(user.login, otp);

    res.json({ success: true });
  } catch (err) {
    console.error('❌ RESEND OTP ERROR', err);
    res.status(500).json({ error: err.message });
  }
};