# 康承压水稳定性系数（GitHub Pages 版）

这是一个纯前端静态网页工具：输入参数 → 计算 → 输出安全系数 k 与是否满足，并在“中间结果”里展示关键中间量用于核对。

## 本地运行（不需要任何软件）
直接双击打开 `index.html` 即可使用。

> 某些浏览器限制本地文件访问脚本时，建议用任意本地静态服务器打开（可选）。
> 但本项目为纯前端，不依赖后端。

## 免费发布到 GitHub Pages（推荐）
1. 在 GitHub 新建仓库（Public 或 Private 都行，Pages 对 Public 更省心）。
2. 把本目录下文件上传到仓库根目录：
   - index.html
   - style.css
   - script.js
   - README.md
3. 打开仓库 Settings → Pages
   - Build and deployment: 选择 `Deploy from a branch`
   - Branch: 选择 `main` / `(root)`
4. 保存后，GitHub 会给你一个 Pages 地址（类似 https://<用户名>.github.io/<仓库名>/ ）

## 公式说明
当前脚本内置一组示例公式（用于先把流程跑通）：
- I = B·H³/12
- M = F·L/2
- σb = M·(H/2)/I
- k = [σ]/σb
- k ≥ 1 为满足

如果你把 Excel 的真实计算逻辑（或把公式/单元格关系说明清楚）发我，我可以把 `script.js` 里的计算部分替换成你 Excel 的版本。
