(function(){
  const $ = (id) => document.getElementById(id);

  function fmt(num, digits=2){
    if (!isFinite(num)) return "—";
    const s = Number(num).toFixed(digits);
    // 去掉多余的尾随零
    return s.replace(/\.00$/, "").replace(/(\.[0-9]*?)0+$/, "$1");
  }

  function compute(inputs){
    // 输入
    const F_kN = inputs.F;
    const L = inputs.L;      // mm
    const B = inputs.B;      // mm
    const H = inputs.H;      // mm
    const sigma_allow = inputs.sigma_allow; // MPa

    // 基本校验
    if ([F_kN,L,B,H,sigma_allow].some(v => !(v>0))){
      return { error: "请确保所有输入参数都为正数。" };
    }

    // 计算：与示例截图一致的一组近似公式
    const F = F_kN * 1000;           // N
    const I = B * Math.pow(H,3) / 12; // mm^4
    const M = F * L / 2;              // N·mm  (按 M=F·L/2)
    const c = H / 2;                  // mm
    const sigma_b = (M * c) / I;      // N/mm^2 = MPa

    const k = sigma_allow / sigma_b;

    // 挠度：简支梁中心集中载荷近似：delta = F*L^3/(48*E*I)
    // E 默认 2.1e5 MPa（钢的数量级），仅用于“中间结果”展示，可按 Excel 替换
    const E = 2.1e5; // MPa = N/mm^2
    const defl = (F * Math.pow(L,3)) / (48 * E * I); // mm

    const ok = k >= 1;

    return { I, M, sigma_b, defl, k, ok };
  }

  function render(res){
    if (res.error){
      $("I").textContent = "—";
      $("M").textContent = "—";
      $("sigmab").textContent = "—";
      $("defl").textContent = "—";
      $("k").textContent = "—";
      $("okBadge").className = "badge";
      $("okBadge").textContent = "—";
      $("why").textContent = res.error;
      return;
    }

    $("I").textContent = fmt(res.I, 0) + " mm⁴";
    $("M").textContent = fmt(res.M/1e6, 2) + " kN·m"; // N·mm → kN·m
    $("sigmab").textContent = fmt(res.sigma_b, 2) + " MPa";
    $("defl").textContent = fmt(res.defl, 3) + " mm";

    $("k").textContent = fmt(res.k, 2);

    if (res.ok){
      $("okBadge").className = "badge ok";
      $("okBadge").textContent = "满足";
      $("why").textContent = "k ≥ 1，满足要求。";
    }else{
      $("okBadge").className = "badge bad";
      $("okBadge").textContent = "不满足";
      $("why").textContent = "k < 1，强度不满足要求。";
    }
  }

  function readInputs(){
    return {
      F: Number($("F").value),
      L: Number($("L").value),
      B: Number($("B").value),
      H: Number($("H").value),
      sigma: Number($("sigma").value), // 暂未参与判断（保留位）
      sigma_allow: Number($("sigma_allow").value)
    };
  }

  $("calcForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const res = compute(readInputs());
    render(res);
  });

  $("resetBtn").addEventListener("click", () => {
    $("F").value = 50;
    $("L").value = 800;
    $("B").value = 200;
    $("H").value = 150;
    $("sigma").value = 250;
    $("sigma_allow").value = 150;
    render({error:"请输入参数后点击“计算”。"});
  });

  // 初始提示
  render({error:"请输入参数后点击“计算”。"});
})();
