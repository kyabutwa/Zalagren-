import { hasConstantynaCapability } from "../intelligence/constantyna";
test("Constantyna capability access is plan bounded",()=>{
 expect(hasConstantynaCapability("NORMAL","explain_zalagren")).toBe(true);
 expect(hasConstantynaCapability("NORMAL","research")).toBe(false);
 expect(hasConstantynaCapability("PLUS","research")).toBe(true);
 expect(hasConstantynaCapability("PLUS","consequential_action")).toBe(false);
 expect(hasConstantynaCapability("PREMIUM","consequential_action")).toBe(true);
});
