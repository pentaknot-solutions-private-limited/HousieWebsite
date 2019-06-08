export class MatchDetail {
     id: number;
     matchId: string;
     title: string;
     description: string;
     matchDateTime: Date;
     matchGeneratedNumber: string;
     hostIp: string;
     createdBy: string;
     creationDate: Date;
     updatedBy: string;
     updatedDate: Date;
     isActive: boolean;
     isDeleted: boolean;
}
export class MatchPlayerRel {
     id: number;
     matchId: string;
     playerId: string;
     tokenGeneratedNumber: string;
     hostIp: string;
     createdBy: string;
     creationDate: Date;
     updatedBy: string;
     updatedDate: Date;
     isActive: boolean;
     isDeleted: boolean;
}

export class MatchPlayerPointRel {
     id: number;
     matchId: string;
     playerId: string;
     claimedPrize: string;
     hostIp: string;
     createdBy: string;
     creationDate: Date;
     updatedBy: string;
     updatedDate: Date;
     isActive: boolean;
     isDeleted: boolean;
     firstLine: boolean;
     secondLine: boolean;
     thirdLine: boolean;
     fullHousie: boolean;
}

export class CheckPlayerMatch {
     playerId: string;
     matchId: string;
     matchToken: string;
}

