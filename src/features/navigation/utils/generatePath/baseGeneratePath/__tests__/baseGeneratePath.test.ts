import { baseGeneratePath } from "../baseGeneratePath";

describe("baseGeneratePath", () => {
  test("1 param", () => {
    expect(
      baseGeneratePath("/segment1/[segment1Param]", { segment1Param: 1 }),
    ).toBe("/segment1/1");
  });

  test("1 param + segment", () => {
    expect(
      baseGeneratePath("/segment1/[segment1Param]/segment2", {
        segment1Param: 1,
      }),
    ).toBe("/segment1/1/segment2");
  });

  test("2 params", () => {
    expect(
      baseGeneratePath("/segment1/[segment1Param]/segment2/[segment2Param]", {
        segment1Param: 1,
        segment2Param: 2,
      }),
    ).toBe("/segment1/1/segment2/2");
  });

  test("2 params consecutively", () => {
    expect(
      baseGeneratePath("/segment1/[segment1Param]/[segment2Param]", {
        segment1Param: 1,
        segment2Param: 2,
      }),
    ).toBe("/segment1/1/2");
  });

  test("catch-all 1 param", () => {
    expect(
      baseGeneratePath("/segment1/[...segment1Param]", {
        segment1Param: [1],
      }),
    ).toBe("/segment1/1");
  });

  test("catch-all 2 params", () => {
    expect(
      baseGeneratePath("/segment1/[...segment1Param]", {
        segment1Param: [1, "2"],
      }),
    ).toBe("/segment1/1/2");
  });

  test("2 params consecutively + catch-all 2 params", () => {
    expect(
      baseGeneratePath(
        "/segment1/[segment1Param]/[segment2Param]/[...segment3Param]",
        {
          segment1Param: 1,
          segment2Param: 2,
          segment3Param: [3, "4"],
        },
      ),
    ).toBe("/segment1/1/2/3/4");
  });

  test("optional catch-all 0 param", () => {
    expect(
      baseGeneratePath("/segment1/[[...segment1Param]]", {
        segment1Param: undefined,
      }),
    ).toBe("/segment1");
  });

  test("optional catch-all 1 param", () => {
    expect(
      baseGeneratePath("/segment1/[[...segment1Param]]", {
        segment1Param: [1],
      }),
    ).toBe("/segment1/1");
  });

  test("optional catch-all 2 params", () => {
    expect(
      baseGeneratePath("/segment1/[[...segment1Param]]", {
        segment1Param: [1, "2"],
      }),
    ).toBe("/segment1/1/2");
  });
});
