import {delFriend, friend} from "../model/friend";

export interface FriendRepository {
    insertFriend(friend:friend):Promise<void>;
    deleteFriend(friend:delFriend):unknown;
    findFriend(friend:delFriend):unknown;
}