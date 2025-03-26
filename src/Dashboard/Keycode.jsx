import React, { useState } from "react";
import { Link } from "react-router-dom";
function Keycode() {
  const [activeTab, setActiveTab] = useState("curl");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="cycle-tab-container">
        <ul className="nav nav-tabs">
          <li className={`cycle-tab-item ${activeTab === "curl" && "active"}`}>
            <Link
              className="nav-link"
              role="tab"
              to="#curl"
              onClick={() => handleTabClick("curl")}
            >
              curl
            </Link>
          </li>
          <li className={`cycle-tab-item ${activeTab === "ruby" && "active"}`}>
            <Link
              className="nav-link"
              role="tab"
              to="#ruby"
              onClick={() => handleTabClick("ruby")}
            >
              Ruby
            </Link>
          </li>
          <li className={`cycle-tab-item ${activeTab === "php" && "active"}`}>
            <Link
              className="nav-link"
              role="tab"
              to="#php"
              onClick={() => handleTabClick("php")}
            >
              php
            </Link>
          </li>
          <li
            className={`cycle-tab-item ${activeTab === "python" && "active"}`}
          >
            <Link
              className="nav-link"
              role="tab"
              to="#python"
              onClick={() => handleTabClick("python")}
            >
              Python
            </Link>
          </li>
          <li
            className={`cycle-tab-item ${activeTab === "Nodejs" && "active"}`}
          >
            <Link
              className="nav-link"
              role="tab"
              to="#Nodejs"
              onClick={() => handleTabClick("Nodejs")}
            >
              Nodejs
            </Link>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className={`tab-pane fade ${activeTab === "curl" && "show active"}`}
            id="curl"
            role="tabpanel"
            aria-labelledby="curl-tab"
          >
            <div>
              <div className="code-snippet">
                <pre>
                  <code>
                    # ------------------ <br />
                    # Create a api call <br />
                    # ------------------ <br />
                    <span className="highlight ">
                      'api-key:YOUR_API_KEY'
                    </span>{" "} <br />
                    <span className="highlight ">
                      'symbol:YOUR_SYMBOL'
                    </span>{" "}<br />
                    curl --location{" "}
                    <span className="highlight ">
                      'https://link.merchant.nute.io/api/fetch-address?keys=api-key&symbol=symbol'
                    </span>{" "}
                  </code>
                </pre>
              </div>
            </div>
          </div>
          <div
            className={`tab-pane fade ${activeTab === "ruby" && "show active"}`}
            id="ruby"
            role="tabpanel"
            aria-labelledby="ruby-tab"
          >
            <div className="code-snippet">
              <pre>
                <code>
                  # ------------------ <br />
                  # Create a api call <br />
                  # ------------------ <br />
                  require &nbsp;
                  <span className="highlight ">'net/http'</span> <br />
                  require &nbsp;
                  <span className="highlight ">'uri'</span> <br />
                  <span className="highlight">api-key</span> = <span className="highlight">'YOUR_API_KEY'</span><br /> 
                  <span className="highlight">symbol</span> = <span className="highlight">'YOUR_SYMBOL'</span><br /> 
                  <span className="highlight">url</span> = 
                  <span className="purple">URI</span>.<span className="highlight">parse</span>('https://link.merchant.nute.io/api/fetch-address')<br />
                  <span className="highlight">params</span> = {"{"}<br />
                  &nbsp;'key' {"=>"} api-key,<br />
                  &nbsp;'symbol' {"=>"} symbol<br />
                  {"}"} <br />
                  url.query = <span className="highlight">URI</span>.encode_www_form(params)<br />
                  http = <span className="highlight">Net::HTTP</span>.new(url.host, url.port) <br />
                  http.use_ssl = <span className="highlight">true if</span> url.scheme == <span className="highlight">'https'</span> <br /> <br />
                  request = <span className="highlight">Net::HTTP::Get</span>.new(url) <br />
                  response = http.request(request) <br />

                  <span style={{ color: "purple" }}>if</span> response.code.to_i == <span className="highlight">200</span><br />
                    &nbsp;puts response.body<br />
                    <span style={{ color: "purple" }}>else</span><br />
                    &nbsp;puts {"Error: #{response.code}"}<br />
                    <span style={{ color: "purple" }}>end</span>
                </code>
              </pre>
            </div>
          </div>
          <div
            className={`tab-pane fade ${activeTab === "php" && "show active"}`}
            id="php"
            role="tabpanel"
            aria-labelledby="php-tab"
          >
            <div className="code-snippet">
              <pre>
                <code>
                  # ------------------ <br />
                  # Create a api call <br />
                  # ------------------ <br />
                  <span className="highlight">$url</span> = <span className="highlight">'https://link.merchant.nute.io/api/fetch-address'</span><br />
                  <span className="highlight">$keys</span> = <span className="highlight">'YOUR_API_KEY'</span><br />
                  <span className="highlight">$symbol</span> = <span className="highlight">'YOUR_SYMBOL'</span><br />
                  <br />
                  <span className="highlight">$params</span> = [<br />
                  'keys' {"=>"} $keys,<br />
                  'symbol' {"=>"} $symbol,<br />
                ];<br />

                <span className="highlight">$queryString</span> = <span className="highlight">http_build_query</span>($params); <br />
                <span className="highlight">$fullUrl</span> = $url . '?' . $queryString;<br />
                <span className="highlight">$options</span> = [<br />
                  &nbsp;<span className="highlight">'http'</span> {"=>"} [ <br />
                  &nbsp;&nbsp;'method' {"=>"} 'GET', <br />
                  &nbsp;&nbsp;'header' {"=>"} "Content-Type: application/json\r\n", <br />
                    &nbsp;], <br />
                ];<br />

                <span className="highlight">$context</span> = <span className="highlight">stream_context_create</span>($options);<br />
                <span className="highlight">$response</span> = <span className="highlight">file_get_contents</span>($fullUrl, false, $context); <br />

                <span style={{"color":"purple"}}>if</span> ($response === FALSE) {"{"} <br />
                  &nbsp;echo 'Error occurred';<br />
              {"}"} <span style={{"color":"purple"}}>else</span> {"{"}<br />
              &nbsp;echo $response;<br />
              {"}"}
                </code>
              </pre>
            </div>
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "python" && "show active"
            }`}
            id="python"
            role="tabpanel"
            aria-labelledby="python-tab"
          >
            <div className="code-snippet">
              <pre>
                <code>
                  # ------------------ <br />
                  # Create a api call
                  <br />
                  # ------------------ <br />
                  
                  <span className="" style={{ color: "purple" }}>
                    import
                  </span>{" "}
                  <span className="text-primary">requests</span> <br />


                  <span className="highlight">url</span> = <span className="highlight">"https://link.merchant.nute.io/api/fetch-address"</span><br />
                  <span className="highlight">params</span> = {"{"} <br />
                      &nbsp;'keys': 'YOUR_API_KEY',<br />
                      &nbsp;'symbol': 'YOUR_SYMBOL'<br />
                  {"}"}<br />

                  <span className="highlight">response</span> = <span className="highlight">requests.get</span>(url, params=params)
                  <br />
                  <span style={{color:"purple"}}>if</span> response.status_code == 200:<br />
                      &nbsp;print(response.text)<br />
                  <span style={{color:"purple"}}>else:</span><br />
                    &nbsp;print(f'Error: {"{response.status_code}"}')<br />
                </code>
              </pre>
            </div>
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "Nodejs" && "show active"
            }`}
            id="Nodejs"
            role="tabpanel"
            aria-labelledby="Nodejs-tab"
          >
            <div className="code-snippet">
              <pre>
                <code>
                  # ------------------ <br />
                  # Create a api call <br />
                  # ------------------ <br />
                  const <span className="text-primary">axios</span> =
                  require(<span className="highlight">'axios'</span> );{" "}
                  <br />
                  <span style={{ color: "purple" }}>var</span> <span className="text-primary">apiKey</span> ={" "}
                  <span className="highlight">'YOUR_API_KEY'</span>; <br />
                  <span style={{ color: "purple" }}>var</span> <span className="text-primary">symbol</span> ={" "}
                  <span className="highlight">'YOUR_SYMBOL'</span>; <br />
                  <span style={{ color: "purple" }}>var</span>{" "}
                  <span className="text-primary">config</span> ={" {"}<br />
                  &nbsp;method:<span className="highlight">'GET'</span><br />
                  &nbsp;url:<span className="highlight">'https://link.merchant.nute.io/api/fetch-address?keys=apiKey&symbol=symbol'</span><br />
                  {"}"} <br />


                  <span style={{ color: "purple" }}>axios.request(config)</span>{" "}<br />
                  <span style={{ color: "purple" }}>.then{"((response)"}</span>{" => "}{"{"}<br />
                  <span className="text-primary"> &nbsp;console.log(JSON.stringify(response.data));</span> <br />{" })"}<br />
                  <span style={{ color: "purple" }}>.catch{"((error)"}</span>{" => "}{"{"}<br />
                  <span className="text-primary"> &nbsp;console.log(error);</span> <br />{" })"}<br />
                  <br />
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Keycode;
