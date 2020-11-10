import axios from 'axios';

const url = 'http://localhost:5000/api/users/';

class UserService{
	//get
	static getUsers(){
		return new Promise( (resolve, reject) => {
			try {
				const res =  axios.get(url);
				const data = res.data;
				resolve(data);
			} catch(err) {
				reject(err);
			}
		});
	}
	//create
	static insertUser(data) {
		return axios.post(url, 
			data
		);
	}
	//delete
	static deleteUser(id) {
		return axios.delete(`${url}${id}`)
	}
}

export default UserService;