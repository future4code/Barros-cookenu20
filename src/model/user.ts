type authenticationData = {
   id: string
}

export type user = {
   id: string,
   name: string,
   email: string,
   password: string
}

export interface UserInputDTO {
   name: string,
   email: string,
   password: string
}

export interface AuthenticationData {
   id: string
}

export interface LoginInputDTO {
   email: string,
   password: string
}

export interface EditUserInputDTO {
   name: string,
   email: string,
   password: string
}

export interface InputProfileDTO {
   token: string
}

export type friend = {
   id: string,
   friendId: string
}

export interface FriendInputDTO {
   friendId: string
}

export type delFriend = {
   friendId: string
}

export interface DelFriendDTO {
   friendId: string
}