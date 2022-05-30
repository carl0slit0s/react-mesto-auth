class Api {
  constructor(server, options) {
    this.options = options;
    this.server = server;
  }

  getProfileData() {
    return fetch(`${this.server}/users/me`, this.options).then(
      this._checkResponse
    );
  }

  getCards() {
    return fetch(`${this.server}/cards`, this.options).then(
      this._checkResponse
    );
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this.server}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
          'Content-Type': 'application/json',
        },
      }).then(this._checkResponse);
    } else {
      return fetch(`${this.server}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
          'Content-Type': 'application/json',
        },
      }).then(this._checkResponse);
    }
  }

  editProfile(data) {
    return fetch(`${this.server}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(`${this.server}/cards`, {
      method: 'POST',
      headers: {
        authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this.server}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  addLike(id) {
    return fetch(`${this.server}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this.server}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  changeAvatar(avatar) {
    return fetch(`${this.server}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  rebderError(err) {
    console.log(`Ошибка: ${err}`);
  }
}

export const api = new Api('https://nomoreparties.co/v1/cohort-39', {
  headers: {
    authorization: 'b14b5010-4fa1-4827-8329-0c3d4de2a70b',
  },
});
