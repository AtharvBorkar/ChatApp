import { Request, NextFunction } from "express";

interface IUser extends Document{
    _id: string
    name: string
    email: string
}


export interface AuthenticatedRequest extends Request{
    user?: IUser | null
}

export const isAuth = async(req:AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    
}