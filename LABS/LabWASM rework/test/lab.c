#include <emscripten/emscripten.h>

#ifdef __cplusplus
extern "C" {
#endif

int EMSCRIPTEN_KEEPALIVE sum(int a, int b) { return a+b; }
int EMSCRIPTEN_KEEPALIVE sub(int a, int b) { return a-b; }
int EMSCRIPTEN_KEEPALIVE mul(int a, int b) { return a*b; }

#ifdef __cplusplus
}
#endif