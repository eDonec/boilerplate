import { Request, Response } from "http-server";

import * as authNValidator from "../index";

const mockRes = () => {
  const res = {} as Response;

  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);

  return res;
};
const mockedNext = jest.fn();
const mockReq = ({
  body,
  query,
  params,
}: {
  body?: Request["body"];
  params?: Request["params"];
  query?: Request["query"];
}) => {
  const req = {} as Request;

  if (body) req.body = body;
  if (query) req.query = query;
  if (params) req.params = params;

  return req;
};

afterEach(() => {
  mockedNext.mockClear();
});

it("should not throw validation error", () => {
  const body = {
    email: "test@example.com",
    password: "123123123",
    userName: "username",
  };

  const mockedReq = mockReq({ body });
  const mockedRes = mockRes();

  authNValidator.signUpClassicValidator(mockedReq, mockedRes, mockedNext);

  expect(mockedNext).toHaveBeenCalledTimes(1);
  expect(mockedRes.send).not.toHaveBeenCalled();
});
