export default async function handler(req, res) {
    const fetchUsersFromApi = async (page = 1) => {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      return await response.json();
    };
  
    let users = [];
    let page = 1;
    let data;
  
    do {
      data = await fetchUsersFromApi(page);
      users = [...users, ...data.data];
      page += 1;
    } while (data.page < data.total_pages);
  
    const filteredUsers = users.filter(user => 
      user.first_name.startsWith('G') || user.last_name.startsWith('W')
    ).map(user => ({
      ...user,
      email: '**********', // Mask email
    }));
  
    res.status(200).json(filteredUsers);
  }
  