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