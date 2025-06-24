// export default function handler(req, res) {
//     console.log(res,'response... from api')
//     res.redirect(301, '/membership/status/failed');
//   }

export default function handler(req, res) {
  const { txnid } = req.query;

  // Log for debugging (optional)
  console.log("Redirecting to success page with txnid:", txnid);

  // Build redirect URL with txnid
  const redirectUrl = `/membership/status/success?txnid=${txnid || ""}`;

  // 307 ensures the request method remains the same (if POST)
  res.redirect(307, redirectUrl);
}
