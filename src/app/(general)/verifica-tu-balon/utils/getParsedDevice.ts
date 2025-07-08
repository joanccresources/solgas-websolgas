import * as UAParser from "ua-parser-js";

export function getParsedDevice(): string {
  const parser = new UAParser.UAParser();
  const result = parser.getResult();
  const vendor = result.device.vendor ?? "";
  const model = result.device.model ?? "";
  const os = result.os.name ?? "";
  const osVersion = result.os.version ?? "";
  const browser = result.browser.name ?? "";
  const browserVersion = result.browser.version ?? "";

  const deviceName = [vendor, model].filter(Boolean).join(" ").trim();
  const osInfo = [os, osVersion].filter(Boolean).join(" ").trim();
  const browserInfo = [browser, browserVersion]
    .filter(Boolean)
    .join(" ")
    .trim();

  return [deviceName, osInfo, browserInfo].filter(Boolean).join(" - ");
}