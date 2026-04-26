const BASE =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTzHFKb1GhsI14vNBIKmJOKbt8iCJN-q0MjiEM-sMRhzx2uVV8n4E9GFuxRZE3f7iKj05BARKDtb2f3/pub";

const GIDS = {
  HOLDINGS: "220478989",
  CASH: "916184738",
  JOBY: "2071449635",
  ACHR: "2039275662",
  TSLA: "718266703",
  MSFT: "922014996",
  NVDA: "591582662",
  SPRE: "1710441844",
  SPUS: "1896425233",
  SPSK: "1940446508",
  AAPL: "1652530159",
  AMZN: "1556721683",
  TSM: "714473632",
  GLD: "739129738",
  WS: "1245226748"
};

function parseCSV(csv) {
  const rows = csv.trim().split(/\r?\n/);
  const headers = rows[0].split(",").map(h => h.trim());

  return rows.slice(1).map(row => {
    const values = row.split(",");
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] ? values[i].trim() : "";
    });
    return obj;
  });
}

async function getSheet(gid) {
  const url = `${BASE}?gid=${gid}&single=true&output=csv`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch gid ${gid}`);
  }

  const csv = await res.text();
  return parseCSV(csv);
}

exports.handler = async function () {
  try {
    const data = {};

    for (const [name, gid] of Object.entries(GIDS)) {
      data[name] = await getSheet(gid);
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data, null, 2)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
