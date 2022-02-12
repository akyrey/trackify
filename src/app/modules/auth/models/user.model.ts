export interface User {
  email: string;
  id: string;
  name: string;
  imageUrl: string;
  token: string;
}

export function googleUserFactory(user: gapi.auth2.GoogleUser): User {
  return {
    id: user.getBasicProfile().getId(),
    name: user.getBasicProfile().getName(),
    email: user.getBasicProfile().getEmail(),
    imageUrl: user.getBasicProfile().getImageUrl(),
    token: user.getAuthResponse().id_token,
  };
}
