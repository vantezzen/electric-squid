/**
 * Cauldron.js - Minecraft Server in your browser
 * Proxy Server: Allows communication between minecraft clients and
 *  a minecraft server running in the browser.
 *
 * @version     2.0.0
 * @copyright   Copyright vantezzen (https://github.com/vantezzen)
 * @link        https://github.com/vantezzen/cauldron-js
 * @license     https://opensource.org/licenses/mit-license.php MIT License
 */
import CauldronProxy from "./CauldronProxy";

console.log("Starting cauldron.js proxy server...");

const proxy = new CauldronProxy();
proxy.start();
