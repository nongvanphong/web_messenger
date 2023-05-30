export interface user_interface {
  iduser: string;
  users_name: string;
  email: string;
  users_premission: number;
  condistion: number;
  img: string;
}

export interface friend_interface {
  idusers: string;
  img: string;
  users_name: string;
}
export interface folower_interface {
  idusers: string;
  img: string;
  users_name: string;
  idfriend: string;
}
export interface myfriend_interface {
  idusers: string;
  img: string;
  users_name: string;
  idfriend: string;
}
