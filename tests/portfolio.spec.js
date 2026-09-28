import { expect, test } from "@playwright/test";

const tabs = [
  ["sobre", "about"],
  ["experiencia", "experience"],
  ["formacao", "education"],
  ["habilidades", "skills"],
  ["projetos", "projects"],
  ["servicos", "services"],
  ["informacoes-adicionais", "additional"],
  ["contato", "contact"],
];

async function expectActiveTab(page, id) {
  await expect(page.locator(`#tab-${id}`)).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.locator(`#${id}`)).toBeVisible();
  await expect(page.locator(".tab-panel.active")).toHaveCount(1);
}

test.describe("navegação e conteúdo", () => {
  test("mantém as relações ARIA entre abas e painéis", async ({ page }) => {
    await page.goto("/#sobre");
    const relations = await page.evaluate(() =>
      [...document.querySelectorAll('[role="tab"]')].map((tab) => {
        const panel = document.getElementById(
          tab.getAttribute("aria-controls"),
        );
        return {
          tabLabel: tab.getAttribute("aria-label") || tab.textContent.trim(),
          selected: tab.getAttribute("aria-selected"),
          panelRole: panel?.getAttribute("role"),
          labelledBy: panel?.getAttribute("aria-labelledby"),
        };
      }),
    );

    expect(relations).toHaveLength(8);
    expect(relations.every((item) => item.panelRole === "tabpanel")).toBe(true);
    expect(relations.every((item) => item.labelledBy)).toBe(true);
    expect(relations.filter((item) => item.selected === "true")).toHaveLength(
      1,
    );
  });

  test("carrega uma única folha de estilo local", async ({ page }) => {
    const stylesheets = [];
    page.on("request", (request) => {
      if (
        request.resourceType() === "stylesheet" &&
        new URL(request.url()).origin === "http://127.0.0.1:8080"
      )
        stylesheets.push(new URL(request.url()).pathname);
    });
    await page.goto("/");

    expect(stylesheets).toEqual(["/styles.css"]);
  });

  for (const [hash, id] of tabs) {
    test(`abre a aba ${hash} por hash`, async ({ page }) => {
      await page.goto(`/#${hash}`);
      await expectActiveTab(page, id);
    });
  }

  test("reload retorna para Sobre e aliases mantêm compatibilidade", async ({
    page,
  }) => {
    for (const [hash, id] of tabs) {
      await page.goto(`/#${hash}`);
      await expectActiveTab(page, id);
      await page.reload();
      await expect(page).toHaveURL(/#sobre$/);
      await expectActiveTab(page, "about");
    }

    await page.goto("/#cursos");
    await expect(page).toHaveURL(/#formacao$/);
    await expectActiveTab(page, "education");
    await page.goto("/#inicio");
    await expectActiveTab(page, "about");
  });

  test("hash desconhecido ou malformado não interrompe a página", async ({
    page,
  }) => {
    for (const hash of ["#nao-existe", "#%E0%A4%A"]) {
      await page.goto(`/${hash}`);
      await expectActiveTab(page, "about");
    }
  });

  test("menu, link Contato e histórico usam o mesmo estado", async ({
    page,
  }) => {
    await page.goto("/#sobre");
    await page.getByRole("tab", { name: "Experiência" }).click();
    await expect(page).toHaveURL(/#experiencia$/);
    await expectActiveTab(page, "experience");

    await page.getByRole("link", { name: "Contato" }).last().click();
    await expect(page).toHaveURL(/#contato$/);
    await expectActiveTab(page, "contact");

    await page.goBack();
    await expectActiveTab(page, "experience");
    await page.goForward();
    await expectActiveTab(page, "contact");
  });

  test("setas movem o foco e Enter seleciona a aba", async ({ page }) => {
    await page.goto("/#sobre");
    const about = page.getByRole("tab", { name: "Sobre" });
    await about.focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { name: "Experiência" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expectActiveTab(page, "experience");
  });
});

test.describe("acordeões", () => {
  const groups = [
    [".record-toggle", "experiencia"],
    [".skill-toggle", "habilidades"],
    [".education-toggle", "formacao"],
    [".service-toggle", "servicos"],
  ];

  for (const [toggleSelector, hash] of groups) {
    test(`${toggleSelector} abre, fecha e mantém exclusividade`, async ({
      page,
    }) => {
      await page.goto(`/#${hash}`);
      const toggles = page.locator(toggleSelector);
      await toggles.first().click();
      await expect(toggles.first()).toHaveAttribute("aria-expanded", "true");
      const firstContent = await toggles.first().getAttribute("aria-controls");
      await expect(page.locator(`#${firstContent}`)).toBeVisible();

      if ((await toggles.count()) > 1) {
        await toggles.nth(1).click();
        await expect(toggles.nth(1)).toHaveAttribute("aria-expanded", "true");
        await expect(toggles.first()).toHaveAttribute("aria-expanded", "false");
        await expect(page.locator(`#${firstContent}`)).toBeHidden();
      }

      const last =
        (await toggles.count()) > 1 ? toggles.nth(1) : toggles.first();
      await last.click();
      await expect(last).toHaveAttribute("aria-expanded", "false");
    });
  }
});

test.describe("tema, movimento e responsividade", () => {
  test("mantém respiro uniforme entre navegação, perfil e painel no mobile", async ({
    page,
  }) => {
    for (const width of [393, 560, 900]) {
      await page.setViewportSize({ width, height: 960 });
      await page.goto("/#sobre");

      const rowGap = await page
        .locator(".app-shell")
        .evaluate((element) =>
          Number.parseFloat(getComputedStyle(element).rowGap),
        );

      expect(rowGap).toBe(16);
    }
  });

  test("feedback de pressionamento não anima ativação por teclado nem movimento reduzido", async ({
    page,
  }) => {
    await page.goto("/#sobre");
    await expect(page.locator(".side-rail")).not.toHaveClass(
      /is-initial-entering/,
    );
    const experienceTab = page.getByRole("tab", { name: "Experiência" });
    for (const theme of ["light", "dark"]) {
      await page.evaluate(
        (value) => document.documentElement.setAttribute("data-theme", value),
        theme,
      );
      await experienceTab.hover();
      const blue = await page.evaluate(() => {
        const probe = document.createElement("span");
        probe.style.color = "var(--blue)";
        document.body.append(probe);
        const color = getComputedStyle(probe).color;
        probe.remove();
        return color;
      });
      await expect
        .poll(() =>
          experienceTab.evaluate((element) => getComputedStyle(element).color),
        )
        .toBe(blue);
      await page.mouse.move(1, 1);
    }

    const resumeLink = page.locator(".profile-actions a").first();
    await resumeLink.hover();
    expect(
      await resumeLink.evaluate(
        (element) => getComputedStyle(element).transitionProperty,
      ),
    ).toContain("color");

    await page.mouse.move(1, 1);
    const bounds = await experienceTab.boundingBox();
    await page.mouse.move(
      bounds.x + bounds.width / 2,
      bounds.y + bounds.height / 2,
    );
    await page.mouse.down();

    await expect
      .poll(() =>
        experienceTab.evaluate(
          (element) => getComputedStyle(element).transform,
        ),
      )
      .toBe("matrix(0.98, 0, 0, 0.98, 0, 0)");
    await page.mouse.up();

    await page.mouse.move(1, 1);
    await expect
      .poll(() =>
        experienceTab.evaluate(
          (element) => getComputedStyle(element).transform,
        ),
      )
      .toBe("none");

    await page.setViewportSize({ width: 393, height: 852 });
    await experienceTab.hover();
    await expect
      .poll(() =>
        experienceTab.evaluate(
          (element) => getComputedStyle(element).transform,
        ),
      )
      .toBe("none");
    await experienceTab.focus();
    await page.keyboard.down("Enter");
    await expect(experienceTab).toBeFocused();
    expect(
      await experienceTab.evaluate(
        (element) => getComputedStyle(element).transform,
      ),
    ).toBe("none");
    await page.keyboard.up("Enter");

    await page.emulateMedia({ reducedMotion: "reduce" });
    const settledBounds = await experienceTab.boundingBox();
    await page.mouse.move(
      settledBounds.x + settledBounds.width / 2,
      settledBounds.y + settledBounds.height / 2,
    );
    await page.mouse.down();
    expect(
      await experienceTab.evaluate(
        (element) => getComputedStyle(element).transform,
      ),
    ).toBe("none");
    await page.mouse.up();
  });

  test("preserva a sequência inicial de 500 ms e a entrada em camadas", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.__animationEvents = [];
      document.addEventListener(
        "animationstart",
        (event) =>
          window.__animationEvents.push({
            name: event.animationName,
            duration: getComputedStyle(event.target).animationDuration,
          }),
        true,
      );
    });
    await page.goto("/");
    await expect
      .poll(() =>
        page.evaluate(() =>
          window.__animationEvents.find((event) => event.duration === "0.5s"),
        ),
      )
      .toBeTruthy();

    await page.getByRole("tab", { name: "Experiência" }).click();
    await expect
      .poll(() =>
        page.evaluate(() =>
          window.__animationEvents.find((event) => event.duration === "0.1s"),
        ),
      )
      .toBeTruthy();
    await expect
      .poll(() =>
        page.evaluate(() =>
          window.__animationEvents.find((event) => event.duration === "0.2s"),
        ),
      )
      .toBeTruthy();

    await page.locator(".record-toggle").first().click();
    await expect
      .poll(() =>
        page.evaluate(() =>
          window.__animationEvents.find((event) => event.duration === "0.3s"),
        ),
      )
      .toBeTruthy();
  });

  test("trocas rápidas limpam estados temporários de animação", async ({
    page,
  }) => {
    await page.goto("/");
    const names = ["Experiência", "Formação", "Habilidades", "Contato"];
    for (let index = 0; index < 12; index += 1) {
      await page
        .getByRole("tab", { name: names[index % names.length] })
        .click();
    }
    await page.waitForTimeout(450);
    await expect(
      page.locator(
        ".is-tab-entering, .is-tab-item-pending, .is-tab-item-entering",
      ),
    ).toHaveCount(0);
  });

  test("menu móvel flutuante e controle de tema mantêm as posições", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto("/#sobre");
    await expect(page.locator(".side-rail")).not.toHaveClass(
      /is-initial-entering/,
    );
    await page.mouse.wheel(0, 520);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(400);
    await page.mouse.wheel(0, -360);
    await expect(page.locator(".side-rail")).toHaveClass(/is-mobile-floating/);
    const themeButton = await page.locator(".theme-toggle").boundingBox();
    expect(themeButton.x).toBeLessThan(120);
    expect(themeButton.y + themeButton.height).toBeGreaterThan(700);
  });

  test("tema troca mesmo quando o armazenamento está bloqueado", async ({
    browser,
  }) => {
    const context = await browser.newContext();
    await context.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        get() {
          throw new DOMException("Bloqueado", "SecurityError");
        },
      });
    });
    const page = await context.newPage();
    await page.goto("/");
    const initial = await page.locator("html").getAttribute("data-theme");
    await page.getByRole("button", { name: /Ativar tema/ }).click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme",
      initial === "dark" ? "light" : "dark",
    );
    await context.close();
  });

  test("canvas continua animado sob redução de movimento", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    const before = await page
      .locator("canvas")
      .evaluate((canvas) => canvas.toDataURL());
    await page.waitForTimeout(120);
    const after = await page
      .locator("canvas")
      .evaluate((canvas) => canvas.toDataURL());
    expect(after).not.toBe(before);
    await context.close();
  });

  test("efeitos de interface são imediatos sob redução de movimento", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/#contato");
    await expect(page.locator(".side-rail")).not.toHaveClass(
      /is-initial-entering/,
    );
    await expect(page.locator(".content-panel")).not.toHaveClass(
      /is-initial-entering/,
    );
    await page.getByRole("tab", { name: "Sobre" }).click();
    await expect(
      page.locator(
        ".is-tab-entering, .is-tab-item-pending, .is-tab-item-entering",
      ),
    ).toHaveCount(0);
    await context.close();
  });

  for (const width of [393, 560, 900, 1097, 1440]) {
    test(`layout ${width}px não cria rolagem horizontal`, async ({ page }) => {
      await page.setViewportSize({ width, height: 960 });
      await page.goto("/");
      await expect(page.locator(".tab-panel.active")).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflow).toBe(false);
    });
  }

  test("tema claro e escuro mantêm a geometria do perfil", async ({ page }) => {
    await page.goto("/#sobre");
    const profile = page.locator(".profile-identity");
    const initial = await profile.boundingBox();
    await page.getByRole("button", { name: /Ativar tema/ }).click();
    const changed = await profile.boundingBox();
    expect(changed).toEqual(initial);
  });
});

test.describe("assets e página do currículo", () => {
  test("carrossel mantém o fade e avança ao próximo logo", async ({ page }) => {
    await page.goto("/");
    const slides = page.locator(".logo-carousel__slide");
    const activeSlide = page.locator(".logo-carousel__slide.is-active");
    await expect(activeSlide).toHaveCount(1);
    await expect
      .poll(() =>
        slides.evaluateAll(
          (items) => items.filter((item) => item.getAttribute("src")).length,
        ),
      )
      .toBe(2);
    await page.waitForTimeout(6_200);
    await expect(activeSlide).toHaveCount(1);
    await expect
      .poll(() =>
        slides.evaluateAll(
          (items) => items.filter((item) => item.getAttribute("src")).length,
        ),
      )
      .toBeGreaterThanOrEqual(3);
  });

  test("Caveat é local e o leitor abre o PDF publicado", async ({ page }) => {
    const externalFontRequests = [];
    page.on("request", (request) => {
      if (/fonts\.(googleapis|gstatic)\.com/.test(request.url()))
        externalFontRequests.push(request.url());
    });
    await page.goto("/curriculo.html");
    await expect(page.locator("iframe")).toHaveAttribute("src", /^blob:/);
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(externalFontRequests).toEqual([]);
  });
});
