import {Server} from "../src/presentation/server"
import {envs} from "../src/config/envs";

jest.mock("../src/presentation/server")

describe('Should call server start with arguments', () => {
    test('sample test', async () => {
        await import("../src/app")
        expect(Server).toHaveBeenCalledTimes(1)
        expect(Server).toHaveBeenCalledWith({
            port: envs.PORT,
            publicPath: envs.PUBLIC_PATH,
            routes: expect.any(Function)
        })

        expect(Server.prototype.start).toHaveBeenCalled()
    })
})