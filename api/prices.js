module.exports = async (req, res) => {
  const url =
    "https://script.google.com/macros/s/AKfycbyNHWc6BN5hvCpi7ugEWsh4K13AAAft8Lp57EgwROHb63WhpSs3pb982RpUQMwuhjrDlA/exec";

  const response = await fetch(url, {
    redirect: "follow",
    headers: { Accept: "application/json" },
  });

  const data = await response.text();

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store");

  res.status(200).send(data);
};
