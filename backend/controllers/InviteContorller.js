import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import nodemailer from "nodemailer";
import { sendInvitationEmail } from "../utils/sendEmail.js";


// export const InviteContorller = catchAsyncErrors(async (req, res, next) => {
//     const { email } = req.body;
//     const user = req.user;
//     console.log(user);

//   //   if (!nodemailer.utils.isEmail(email)) {
//   //     return res.status(400).json({
//   //         message: "Invalid email address format"
//   //     });
//   // }

//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true, 
//         auth: {
//           user: user.email,
//           pass: user.passCode,
//         },
//       });

//     const info = await transporter.sendMail({
//         from: user.email,
//         to: email, 
//         subject: "Registration",
//         text: `Click here for registration in placemnet portal. http://localhost:5173/register/student`,
//     });

//     console.log("Message sent: %s", info.messageId);
//     return res.status(201).json({
//         message: info
//     })
    
// });

export const InviteContorller = catchAsyncErrors(async (req, res, next)=>{
  const { email } = req.body;
  const user = req.user;
  const data = `Click here for registration in placement portal hahah. http://localhost:5173/register/student`;
  const a = await sendInvitationEmail(email, user, data);
  if(a){
    console.log(a.messageId, "sdfasdf af asfa sf ")
    return res.status(201).json({
              message: a
          })
  }
})

