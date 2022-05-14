/**
 * electric-squid - flying-squid in the browser
 * Proxy Server: Allows communication between minecraft clients and
 *  a minecraft server running in the browser.
 *
 * @version     2.0.0
 * @copyright   Copyright vantezzen (https://github.com/vantezzen)
 * @link        https://github.com/vantezzen/electric-squid
 * @license     https://opensource.org/licenses/mit-license.php MIT License
 */
import SquidProxy from "./SquidProxy";

console.log("Starting electric-squid proxy server...");

const proxy = new SquidProxy();
proxy.start();
