export class LoginModel {
    email: string;
    passwordHash: string;
}

export class Player {
    id: number;
    playerId: string;
    name: string;
    email: string;
    mobileNumber: string;
    address: string;
    passwordHash: string;
    hostIp: string;
    createdBy: string;
    creationDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
}
