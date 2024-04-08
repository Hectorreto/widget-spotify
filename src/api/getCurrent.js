const endpoint = 'https://api.spotify.com/v1/me/player/currently-playing'
const token = 'BQDcMzUy3d725iqsXTtPQ60c7sLE8cOzp6dw-GiLhG-saA-z5NitG_tSxGccszrGUJJ9I33eDOVj0hyy59VyoMEm0_Ic_sIbc7dygQ9ZLt0yI6nGbj-Vk7UwNVv4c4mVH_UVDimgLfT1acOcQskGo6vWp7ANhL-3T-WEc0QDxx5Av3bZ6LNCBxzSPq9xmD_aKwQ8f3M03rQ'

const getCurrent = async () => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error)
  }
}

getCurrent().then(data => {
  console.log(data)
})
