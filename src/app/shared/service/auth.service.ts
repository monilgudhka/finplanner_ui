export class AuthService {
    private LOGIN_ID_KEY: string = 'login_id';

    public signIn(loginId: string) : boolean {
        // TODO: call Get Family API
        localStorage.setItem(this.LOGIN_ID_KEY, loginId);
        return true;
    }

    public isSignedIn(): boolean {
        return (localStorage.getItem(this.LOGIN_ID_KEY) !== null);
    }

    public getLoginId(): string {
        const loginId = localStorage.getItem(this.LOGIN_ID_KEY);
        return (loginId === null)? '' : loginId;
    }

    public signOut() {
        localStorage.clear();
    }

}