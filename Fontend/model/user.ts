export interface IUser {
        _id: string;
        fullName: string;
        email: string;
        password: string;
        avatar: string;
        gender: string;
        address: string;
        mobile: string;
        story: string;
        website: string;
        followers: string[];
        following: string[];
        saved: [],
        createdAt: string;
        updatedAt: string;
}