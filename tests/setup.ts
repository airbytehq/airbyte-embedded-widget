import { TextEncoder, TextDecoder } from "util";

// Add TextEncoder and TextDecoder to global scope
global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
