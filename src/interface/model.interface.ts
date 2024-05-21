export interface userInterace extends Document {
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
    usertype: string;
    isPasswordCorrect(password: string): Promise<boolean>; 
}
