import grpc, { Server, ServerCredentials, loadPackageDefinition } from "@grpc/grpc-js";
import path from "path";
import { PackageDefinition, loadSync } from "@grpc/proto-loader";
import { driver_controller } from "../controllers/driver.controller";


export class GrpcClass {

    // private protoFilePath = path.resolve(__dirname, `${process.cwd()}/todo.proto`);
    private protoFilePath = path.join(__dirname, `../../../user/protos/user.proto`);

    public booking: any;
    public grpcServer!: Server;

    constructor() {
        this.startGrpcServer()
    }

    private startGrpcServer() {
        this.loadGRPC();
        this.grpcServer = new Server();
        this.loadServiceDefinition();
        this.initServer();
    }

    private loadGRPC() {
        try {
            const packageDef: PackageDefinition = loadSync(
                path.resolve(__dirname, this.protoFilePath),
                {
                    keepCase: true,
                    longs: String,
                    enums: String,
                    defaults: true,
                    oneofs: true,
                }
            );
            const grpcObject = loadPackageDefinition(packageDef);
            this.booking = grpcObject.booking;

        } catch (err) {
            console.log(err);
        }
    }

    private loadServiceDefinition() {
        this.loadService(this.grpcServer, this.booking);
    }

    public loadService(grpcServer: Server, booking: any) {
        grpcServer.addService(booking.BookingService.service, {GetAvailableDrivers: driver_controller.getAllDriversGRPC}
        );
    }

    private initServer() {
        this.grpcServer.bindAsync(
            `0.0.0.0:7000`,
            ServerCredentials.createInsecure(),
            this.grpcCallback
        );
    }

    private grpcCallback = (err: Error | null, port: number): void => {
        if (err) {
            console.error(err);
            return;
        }
        this.grpcServer.start();
        console.log(`gRPC server listening on ${port}`);
    };
}