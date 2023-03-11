
export default function ProfileButton({ user }) {

    const { firstName, email, id } = user;

    console.log(user);

    return (
        <>
            <i className="fa-sharp fa-solid fa-circle-user" style={{ fontSize: '30px', color: 'purple' }}></i>
            <div>Hello, {firstName}</div>
            <div>{email}</div>
            <div>Manage Spots (userId={id})</div>
        </>

    )

};
