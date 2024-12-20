// import axios from "axios";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { name, email, phone, countryCode } = req.body;

//     const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

//     if (!slackWebhookUrl) {
//       return res.status(500).json({ error: "Slack Webhook URL is not defined" });
//     }

//     const message = {
//       text: `Enquiry Form Submission:\n*Name*: ${name}\n*Email*: ${email}\n*Phone*: +${countryCode}${phone}`,
//     };

//     try {
//       const slackResponse = await axios.post(slackWebhookUrl, message);
//       if (slackResponse.status === 200) {
//         return res.status(200).json({ message: "Message sent to Slack!" });
//       } else {
//         return res.status(500).json({
//           error: `Slack API error: ${slackResponse.statusText}`,
//         });
//       }
//     } catch (error) {
//       return res.status(500).json({
//         error: `Slack API request failed: ${error.message}`,
//       });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, phone, countryCode, companyName } = req.body;

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!slackWebhookUrl) {
      return res.status(500).json({ error: "Slack Webhook URL is not defined" });
    }

    const message = {
      text: `Network Waitlist Form Submission:\n*Name*: ${name}\n*Email*: ${email}\n*Phone*: +${countryCode}${phone}\n*Company Name*: ${companyName}`,
    };

    try {
      const slackResponse = await axios.post(slackWebhookUrl, message);
      if (slackResponse.status === 200) {
        return res.status(200).json({ message: "Message sent to Slack!" });
      } else {
        return res.status(500).json({
          error: `Slack API error: ${slackResponse.statusText}`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: `Slack API request failed: ${error.message}`,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
