// export default function handler(req, res) {
//     console.log(res,'response... from api')
//     res.redirect(301, '/membership/status/failed');
//   }

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { txnid } = req.body;

    // Redirect to your success page using a GET request
    return res.redirect(
      302,
      `/membership/status/failed?txnid=${encodeURIComponent(txnid || "")}`
    );
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
