import React from 'react'

export class SignUpForm extends React.Component {

  constructor(props) {
    super(props);
      this.state = { email: "", success: false };
  }

  handleSubmit = e => {
    e.preventDefault();

    const encode = (data) => {
      return Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&");
    };
    fetch("/", {
     method: "POST",
     headers: { "Content-Type": "application/x-www-form-urlencoded" },
     body: encode({ "form-name": "contact", ...this.state })
    })
      .then(() => this.setState({ success: true }))
      .catch(error => alert(error));
   };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { email, success } = this.state;
    return (
      <div className='pt-0 pb-2 bg-gray-100 mb-0'>
        <div className='container'>
          <div className='flex justify-center items-center flex-row mb-1 rounded flex-wrap'>
            <form onSubmit={this.handleSubmit}>
              <h3 className='font-bold text-center'> Sign up to stay up to date with the GSN launch </h3>
              {!success &&
                <div className="flex justify-center items-center flex-wrap">
                  <input className="mt-2 md:mr-4 sm:mr-0 rounded p-2 w-full" value={email} onChange={this.handleChange}
                    type="email" name="email" placeholder="Enter your email..." />
                  <button className="mt-2 rounded" type="submit">Sign up</button>
                </div>
              }
              {success &&
                <p className="text-center font-bold"> You are signed up! </p>
              }
            </form>
          </div>
        </div>
      </div>
    );
  }

}
