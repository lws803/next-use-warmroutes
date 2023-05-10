import { renderHook } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

import useWarmRoutes from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({ pathname: "/path" }),
}));

describe(useWarmRoutes, () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("sends a OPTIONS request to ths specified route when current route matches", () => {
    renderHook(() => useWarmRoutes({ "/path": ["/path/to/be/warmed/up"] }));

    expect(fetch).toHaveBeenCalledWith("/path/to/be/warmed/up", {
      method: "OPTIONS",
    });
  });

  it("do not call when current route does not match", () => {
    renderHook(() => useWarmRoutes({ "/": ["/path/to/be/warmed/up"] }));

    expect(fetch).not.toHaveBeenCalled();
  });
});
