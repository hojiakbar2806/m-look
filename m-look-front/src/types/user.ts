export interface IUser  {
      id: number,
      name: string,
      email: string,
      password: string,
      
}

export interface IAuth {
      is_logged_in:boolean
      access_token:string|null,
      user?: IUser | null
}