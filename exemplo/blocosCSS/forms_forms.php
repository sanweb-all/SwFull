<section>
  <div class="g-xg">
    <div class="topo">
      <h1>Forms</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">Forms</li>
        </ol>
      </nav>
    </div>
    <div class="l">
      <form action="#" method="get" class="wform">
        <div class="l">
          <div class="co8-g">
            <label for="exe1" class="label">Text</label>
            <input type="text" class="" id="exe1" name="exe1" required />
          </div>
          <div class="co4-g">
            <label for="exe2" class="label">Placeholder</label>
            <input type="text" class="" id="exe2" name="exe2" placeholder="SandroWeb" />
          </div>
        </div>
        <div class="l">
          <div class="co6-g">
            <label for="exe3" class="label">Desabilitado</label>
            <input type="text" class="" id="exe3" name="exe3" disabled placeholder="SandroWeb" />
          </div>
          <div class="co6-g">
            <label for="exe4" class="label">Só numeros</label>
            <input type="number" class="" id="exe4" name="exe4" />
          </div>
        </div>
        <div class="l">
          <div class="co7-g">
            <label for="exe5" class="label">Email</label>
            <input type="email" class="" id="exe5" name="exe5" />
          </div>
          <div class="co5-g">
            <label for="exe6" class="label">Select</label>
            <select SwSelect class="select" name="exe6" id="exe6">
              <option selected value="">valor 01</option>
              <option value="">valor 02</option>
              <option value="">valor 03</option>
              <option value="">valor 04</option>
            </select>
          </div>
        </div>
        <div class="l">
          <div class="co6-g">
            <label for="exe7" class="label">Email <small>(login)</small></label>
            <input type="email" class="" id="exe7" name="exe7" />
          </div>
          <div class="co6-g posi-r">
            <label for="exe8" class="label">Senha</label>
            <input type="password" class="" id="senha" name="exe8" />
          </div>
        </div>
        <div class="l">
          <div class="co12-g">
            <fieldset class="mf1">
              <legend>Check Block <small>[ .check-b ]</small></legend>
              <div class="check-b">
                <div class="bl-radio">
                  <input type="radio" class="f-check" id="html" name="exe9" value="HTML" />
                  <label for="html">HTML</label>
                </div>
                <div class="bl-radio">
                  <input type="radio" class="f-check" id="css" name="exe9" value="CSS" />
                  <label for="css">CSS</label>
                </div>
                <div class="bl-radio">
                  <input type="radio" class="f-check" id="javascript" name="exe9" value="JavaScript" />
                  <label for="javascript">JavaScript</label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="l">
          <div class="co12-g">
            <fieldset class="mf1">
              <legend>Check Inline <small>[ .check-i ]</small></legend>
              <div class="check-i">
                <div class="bl-checkbox">
                  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                  <label for="vehicle1"> Homem</label>
                </div>
                <div class="bl-checkbox">
                  <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                  <label for="vehicle2"> Mulher</label>
                </div>
                <div class="bl-checkbox">
                  <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
                  <label for="vehicle3"> Outros</label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="l">
          <div class="co4-g">
            <label for="exe10" class="label">CPF <small>(com mascara)</small></label>
            <input type="text" class="cpf" id="exe10" name="exe10" SwMasc SwMasc-mask="cpf" />
          </div>
          <div class="co4-g">
            <label for="exe11" class="label">Tel <small>(com mascara)</small></label>
            <input type="tel" class="tel" id="exe11" name="exe11" SwMasc SwMasc-mask="phone" />
          </div>
          <div class="co4-g">
            <label for="exe12" class="label">Money <small>(com mascara)</small></label>
            <input type="text" class="moeda" id="exe12" name="exe12" SwMasc SwMasc-mask="money" SwMasc-symbol="off" />
          </div>
        </div>
        <div class="l">
          <div class="co4-g">
            <label for="exe14" class="label">Data <small></small></label>
            <input type="date" id="exe14" name="exe14" value="2018-07-22" min="2025-01-01" max="2025-12-31" />
          </div>
          <div class="co4-g">
            <label for="exe15" class="label">Data e Hora <small></small></label>
            <input type="datetime-local" id="exe15" name="exe15" value="2025-06-12T19:30" min="2025-06-07T00:00" max="2025-06-14T00:00" />
          </div>
          <div class="co4-g">
            <label for="exe16" class="label">Semana <small></small></label>
            <input type="week" id="exe16" name="exe16" min="2025-W18" max="2025-W40" />
          </div>
        </div>
        <div class="l">
          <div class="co12-g">
            <label for="myfile" class="label">Arquivo:</label>
            <input type="file" id="myfile" name="myfile" />
          </div>
        </div>
        <div class="l">
          <div class="co12-g">
            <label for="example" class="label">Datalist</label>
            <input list="datalist" id="example" placeholder="Pesquise..." />
            <datalist id="datalist">
              <option value="Programador"></option>
              <option value="Bombeiro"></option>
              <option value="Policial"></option>
              <option value="Pedreiro"></option>
              <option value="Carpinteiro"></option>
              <option value="Outros"></option>
            </datalist>
          </div>
        </div>
        <div class="l et1">
          <div class="co6-g">
            <button type="submit" class="btn btn-g btn-peri wp100 Tbran">Fechar</button>
          </div>
          <div class="co6-g">
            <button id="AddBtn" type="submit" class="btn btn-g btn-prin wp100 Tbran">Cadastrar</button>
          </div>
        </div>
      </form>
    </div>
    <div class="l">
      <div class="co12-g">
        <pre WfCode><script type="text/plain">
<form action="#" method="get" class="">
   <div class="l">
      <div class="co8-g">
         <label for="exe1" class="label">Text</label>
         <input type="text" class="" id="exe1" name="exe1" required>
      </div>
      <div class="co4-g">
         <label for="exe2" class="label">Placeholder</label>
         <input type="text" class="" id="exe2" name="exe2" placeholder="SandroWeb">
      </div>
   </div>
   <div class="l">
      <div class="co6-g">
         <label for="exe3" class="label">Desabilitado</label>
         <input type="text" class="" id="exe3" name="exe3" disabled placeholder="SandroWeb">
      </div>
      <div class="co6-g">
         <label for="exe4" class="label">Só numeros</label>
         <input type="number" class="" id="exe4" name="exe4">
      </div>
   </div>
   <div class="l">
      <div class="co7-g">
         <label for="exe5" class="label">Email</label>
         <input type="email" class="" id="exe5" name="exe5">
      </div>
      <div class="co5-g">
         <label for="exe6" class="label">Select</label>
         <select class="select" name="exe6" id="exe6">
               <option selected value=''>valor 01</option>
               <option value="">valor 02</option>
               <option value="">valor 03</option>
               <option value="">valor 04</option>
         </select>
      </div>
   </div>
   <div class="l">
      <div class="co6-g">
         <label for="exe7" class="label">Email <small>(login)</small></label>
         <input type="email" class="" id="exe7" name="exe7">
      </div>
      <div class="co6-g posi-r">
         <label for="exe8" class="label">Senha</label>
         <input type="password" class="" id="senha" name="exe8">
      </div>
   </div>
   <div class="l">
      <div class="co12-g">
         <fieldset class="mf1">
               <legend>Check Block <small>[ .check-b ]</small></legend>
               <div class="check-b">
                  <div class="bl-radio">
                     <input type="radio" class="f-check" id="html" name="exe9" value="HTML">
                     <label for="html">HTML</label>
                  </div>
                  <div class="bl-radio">
                     <input type="radio" class="f-check" id="css" name="exe9" value="CSS">
                     <label for="css">CSS</label>
                  </div>
                  <div class="bl-radio">
                     <input type="radio" class="f-check" id="javascript" name="exe9"
                           value="JavaScript">
                     <label for="javascript">JavaScript</label>
                  </div>
               </div>
         </fieldset>
      </div>
   </div>
   <div class="l">
      <div class="co12-g">
         <fieldset class="mf1">
               <legend>Check Inline <small>[ .check-i ]</small></legend>
               <div class="check-i">
                  <div class="bl-checkbox">
                     <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                     <label for="vehicle1"> Homem</label>
                  </div>
                  <div class="bl-checkbox">
                     <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
                     <label for="vehicle2"> Mulher</label>
                  </div>
                  <div class="bl-checkbox">
                     <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
                     <label for="vehicle3"> Outros</label>
                  </div>
               </div>
         </fieldset>
      </div>
   </div>
   <div class="l">
      <div class="co4-g">
         <label for="exe10" class="label">CPF <small>(com mascara)</small></label>
         <input type="text" class="cpf" id="exe10" name="exe10">
      </div>
      <div class="co4-g">
         <label for="exe11" class="label">Tel <small>(com mascara)</small></label>
         <input type="tel" class="tel" id="exe11" name="exe11">
      </div>
      <div class="co4-g">
         <label for="exe12" class="label">R$ <small>(com mascara)</small></label>
         <input type="text" class="moeda" id="exe12" name="exe12">
      </div>
   </div>
   <div class="l">
      <div class="co4-g">
         <label for="exe14" class="label">Data <small></small></label>
         <input type="date" id="exe14" name="exe14" value="2018-07-22" min="2025-01-01" max="2025-12-31">
      </div>
      <div class="co4-g">
         <label for="exe15" class="label">Data e Hora <small></small></label>
         <input type="datetime-local" id="exe15" name="exe15" value="2025-06-12T19:30" min="2025-06-07T00:00" max="2025-06-14T00:00">
      </div>
      <div class="co4-g">
         <label for="exe16" class="label">Semana <small></small></label>
         <input type="week" id="exe16" name="exe16" min="2025-W18" max="2025-W40">
      </div>
   </div>
   <div class="l">
      <div class="co12-g">
         <label for="myfile" class="label">Arquivo:</label>
         <input type="file" id="myfile" name="myfile">
      </div>
   </div>
   <div class="l">
      <div class="co12-g">
         <label for="example" class="label">Datalist</label>
         <input list="datalist" id="example" placeholder="Pesquise...">
         <datalist id="datalist">
               <option value="Programador">
               <option value="Bombeiro">
               <option value="Policial">
               <option value="Pedreiro">
               <option value="Carpinteiro">
               <option value="Outros">
         </datalist>
      </div>
   </div>
   <div class="l et1">
      <div class="co6-g">
         <button type="submit" class="btn btn-g btn-peri wp100 Tbran">Fechar</button>
      </div>
      <div class="co6-g">
         <button id="AddBtn" type="submit" class="btn btn-g btn-prin wp100 Tbran">Cadastrar</button>
      </div>
   </div>
</form>
</script>
</pre>
      </div>
    </div>
  </div>
</section>