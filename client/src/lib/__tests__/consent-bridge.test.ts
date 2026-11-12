import { describe, it, expect } from "vitest";
import { beslissingUitTcData, GOOGLE_VENDOR_ID, type TcDataLike } from "../consent-bridge";

const volledig: TcDataLike = {
  eventStatus: "useractioncomplete",
  gdprApplies: true,
  purpose: {
    consents: { "1": true, "2": true, "3": true, "4": true, "7": true, "8": true, "9": true, "10": true },
    legitimateInterests: {},
  },
  vendor: { consents: { [String(GOOGLE_VENDOR_ID)]: true } },
};

describe("beslissingUitTcData (Funding Choices → Consent Mode)", () => {
  it("geeft null zolang de banner nog open staat", () => {
    expect(beslissingUitTcData({ ...volledig, eventStatus: "cmpuishown" })).toBeNull();
    expect(beslissingUitTcData(null)).toBeNull();
  });

  it("volledige toestemming → analytics en advertising granted", () => {
    expect(beslissingUitTcData(volledig)).toEqual({ analytics: true, advertising: true });
  });

  it("tcloaded met bestaande toestemming telt ook (herhaalbezoek)", () => {
    expect(beslissingUitTcData({ ...volledig, eventStatus: "tcloaded" })?.analytics).toBe(true);
  });

  it("enkel doel 1 zonder meting (doel 8) → analytics denied", () => {
    const b = beslissingUitTcData({
      ...volledig,
      purpose: { consents: { "1": true }, legitimateInterests: {} },
    });
    expect(b).toEqual({ analytics: false, advertising: false });
  });

  it("doel 8 via gerechtvaardigd belang volstaat voor meting", () => {
    const b = beslissingUitTcData({
      ...volledig,
      purpose: { consents: { "1": true }, legitimateInterests: { "8": true } },
    });
    expect(b?.analytics).toBe(true);
    expect(b?.advertising).toBe(false);
  });

  it("zonder Google als aanvaarde leverancier (755) → alles denied", () => {
    const b = beslissingUitTcData({ ...volledig, vendor: { consents: {} } });
    expect(b).toEqual({ analytics: false, advertising: false });
  });

  it("buiten de EER (gdprApplies=false) → granted zonder banner", () => {
    expect(beslissingUitTcData({ eventStatus: "tcloaded", gdprApplies: false })).toEqual({ analytics: true, advertising: true });
  });
});
