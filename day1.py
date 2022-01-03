import taichi as ti

ti.init(arch=ti.gpu)

n = 640
pixels = ti.field(dtype=float, shape=(n * 2, n))


@ti.func
def complex_sqr(z):
    return ti.Vector([z[0] ** 2 - z[1] ** 2, z[1] * z[0] * 2])


@ti.kernel
def paint():
    for i, j in pixels:  # Parallelized over all pixels
        pixels[i, j] = 0.5 * ti.random() * ti.cos(i * 3.0)

    for _ in range(10_000):
        px = int(2 * n * ti.random())
        py = int(n * ti.random())

        ort = 1 if (.5 - ti.random()) > 0 else -1
        for k in range(3 + int(10*ti.random())):
            pixels[px + k , py + ort*k] = .8


if __name__ == '__main__':
    gui = ti.GUI("10k", res=(n * 2, n), show_gui=True)
    paint()
    gui.set_image(pixels)
    gui.show("day1.png")
