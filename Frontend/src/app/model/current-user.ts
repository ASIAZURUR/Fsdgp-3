export class CurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  profileImg: string;
  fullname: string;
  email: string;

  static fromJson(json: any) {
    let obj = new CurrentUser();
    obj.id = json.id;
    obj.firstName = json.first_name;
    obj.lastName = json.last_name;
    obj.fullname = json.first_name + ' ' + json.last_name;
    obj.profileImg = json.image_path;
    obj.email = json.email;
    return obj;
  }
}