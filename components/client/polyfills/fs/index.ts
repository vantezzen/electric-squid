import fs from "browserify-fs";
import promises from "./promises";

export default fs;

const { stat, mkdir } = fs;

export { promises, stat, mkdir };
