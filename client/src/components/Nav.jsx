export default function Nav() {
    return (
        <nav>
          <h1 className="text-3xl text-center font-bold">Tweeter</h1>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/signup">Signup</a>
            </li>
          </ul>
        </nav>
    )
}