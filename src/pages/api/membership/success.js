// export default function handler(req, res) {
//     res.redirect(301, '/membership/status/success');
//   }

export default async function handler(req, res) {
    if (req.method === "POST") {
      const { txnid } = req.body;
  
      // Redirect to your success page using a GET request
      return res.redirect(
        302,
        `/membership/status/success?txnid=${encodeURIComponent(txnid || "")}`
      );
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }