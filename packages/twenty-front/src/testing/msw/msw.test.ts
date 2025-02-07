import { HttpResponse, http } from 'msw'
import request from 'supertest'
import { nodeMswServer } from "~/testing/msw/server"
describe("msw is live", () => {
    it("should start msw", async () => {
         nodeMswServer.use(
            http.get("https://example.com/msw", () => new HttpResponse("I'm a teapot", {status: 418}))
        );
        const response = await request("https://example.com").get("/msw").expect(500)
        expect(true).toBe(false)
    })
})