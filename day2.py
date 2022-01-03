import taichi as ti

ti.init(arch=ti.gpu)

n = 240
w, h = n * 2, n * 3
pixels = ti.field(dtype=float, shape=(w, h))
g = 4
r1, r2 = 50 ** 2, 40 ** 2


@ti.kernel
def paint():
    for x, y in pixels:  # Parallelized over all pixels

        if x > n:
            if ti.random() > (1 - y / h) ** g:
                pixels[x, y] = 0
            else:
                pixels[x, y] = 1

        else:
            if ti.random() > (y / h) ** g:
                pixels[x, y] = 0
            else:
                pixels[x, y] = 1

        d = (x - w / 2) ** 2 + (y - h / 2) ** 2
        if d < r1:
            pixels[x, y] = 1 if (d / r1) > ti.random() ** 1 else 0


if __name__ == '__main__':
    gui = ti.GUI("dithering", res=(w, h), show_gui=True)
    paint()
    gui.set_image(pixels)
    # gui.circle((.5, .5), radius=50, color=0xffffff)
    gui.show("day2.png")
