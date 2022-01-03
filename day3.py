import taichi as ti

ti.init(arch=ti.gpu)

n = 240
w, h = n * 3, n * 2
pixels = ti.field(dtype=float, shape=(w, h, 3))
# sps = ti.Matrix(4, 2,)
# sps.ndarray = [[.2, 0, 0, .4], [0, 1, .2, .6]]


@ti.kernel
def paint():
    # for i, sp in enumerate(sps):
        for x, y, c in pixels:  # Parallelized over all pixels
            # print(x)
            pixels[x, y, 0] = .2
            pixels[x, y, 1] = 1
            pixels[x, y, 2] = .2


if __name__ == '__main__':
    gui = ti.GUI("space", res=(w, h), show_gui=True)
    paint()
    gui.set_image(pixels)
    gui.show("day3.png")
