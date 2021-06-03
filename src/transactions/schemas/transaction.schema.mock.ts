import { getModelToken } from "@nestjs/mongoose";
import { Transaction } from "./transaction.schema";

const mockTransectionsModel = {
    provide: getModelToken(Transaction.name),
    useValue: {
        find: jest.fn().mockResolvedValue([{}]),
    }
};

export default mockTransectionsModel;
