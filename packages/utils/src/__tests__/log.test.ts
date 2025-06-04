import { describe, it, expect, jest } from "@jest/globals";
import { log } from "..";

jest.spyOn(global.console, "log");

describe("@repo/utils", () => {
  it("prints a message", () => {
    log("hello");
    expect(console.log).toHaveBeenCalled();
  });
});
