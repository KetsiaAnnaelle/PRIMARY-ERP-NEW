// pages/index.js

"use client"
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';

export default function Home() {
  const pdfRef = useRef();

  // Fonction pour générer le PDF
  const generatePdf = () => {
    const element = pdfRef.current;

    const opt = {
      margin: 0.5,
      filename: 'report_card.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div >
      <button onClick={generatePdf}>Générer PDF</button>

      <div ref={pdfRef} style={{ padding: '20px', backgroundColor: '#fff', width: '100%', display:'flex' }}>

        {/* <h2>Bulletin de Notes</h2> */}
        <table cellPadding="7" style={{ width: '100%', borderCollapse: 'collapse', border:'3px groove blue' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black'}}></th>
              <th style={{ border: '1px solid black'}}>Matiere</th>
              <th style={{ border: '1px solid black'}}>Notes</th>
              <th style={{ border: '1px solid black'}}>1ere Sequence</th>
              <th style={{ border: '1px solid black'}}>2eme Sequence</th>
              <th style={{ border: '1px solid black'}}>3eme Sequence</th>
            </tr>
          </thead> 
          <tbody>
            <tr>
              <td rowSpan={4} style={{ border: '1px solid black'}}>Français</td>
              <td style={{ border: '1px solid black'}}>Dictee</td>
              <td style={{ border: '1px solid black'}}>20</td>
              <td style={{ border: '1px solid black'}}>14</td>
              <td style={{ border: '1px solid black'}}>17</td>
              <td style={{ border: '1px solid black'}}>20</td>
            </tr>

            <tr>
              <td style={{ border: '1px solid black'}}>Etude de Texte</td>
              <td style={{ border: '1px solid black'}}>20</td>
              <td style={{ border: '1px solid black'}}>17</td>
              <td style={{ border: '1px solid black'}}>16</td>
              <td style={{ border: '1px solid black'}}>20</td>
            </tr>

            <tr>
              <td style={{ border: '1px solid black'}}>Ecriture</td>
              <td style={{ border: '1px solid black'}}>20</td>
              <td style={{ border: '1px solid black'}}>17</td>
              <td style={{ border: '1px solid black'}}>16</td>
              <td style={{ border: '1px solid black'}}>20</td>
            </tr>

            <tr>
              <td style={{ border: '1px solid black'}}>Question</td>
              <td style={{ border: '1px solid black'}}>20</td>
              <td style={{ border: '1px solid black'}}>17</td>
              <td style={{ border: '1px solid black'}}>16</td>
              <td style={{ border: '1px solid black'}}>20</td>
            </tr>

            <tr>
              <td rowSpan={3} style={{ border: '1px solid black'}}></td>
              <td style={{ border: '1px solid black'}}> <strong>TOTAL:</strong></td>
              <td style={{ border: '1px solid black'}}>330</td>
              <td style={{ border: '1px solid black'}}>260</td>
              <td style={{ border: '1px solid black'}}>264</td>
              <td style={{ border: '1px solid black'}}>246</td>
            </tr>

            <tr>
              <td style={{ border: '1px solid black'}}> <strong>MOYENNE:</strong></td>
              <td style={{ border: '1px solid black'}}></td>
              <td style={{ border: '1px solid black'}}>15,75</td>
              <td style={{ border: '1px solid black'}}>16</td>
              <td style={{ border: '1px solid black'}}>17</td>
            </tr>

            <tr>
              <td style={{ border: '1px solid black'}}> <strong>RANG:</strong></td>
              <td style={{ border: '1px solid black'}}></td>
              <td style={{ border: '1px solid black'}}>4e</td>
              <td style={{ border: '1px solid black'}}>1ere</td>
              <td style={{ border: '1px solid black'}}>6eme</td>
            </tr>
          </tbody>
        </table>

        <div style={{ padding: '50px', backgroundColor: '#fff', width: '100%' }}>
        <table cellPadding="5" style={{ borderCollapse: 'collapse', border:'3px groove blue' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black'}}>Sequence</th>
              <th style={{ border: '1px solid black'}}>Appreciation du Maitre</th>
              <th style={{ border: '1px solid black'}}>Visa du/de la Directeur(trice)</th>
              <th style={{ border: '1px solid black'}}>Visa du Parent</th>
            </tr>
          </thead> 
              
          <tbody>
            <tr>
              <th style={{ border: '1px solid black'}}>1ere Sequence</th>
              <th style={{ border: '1px solid black'}}></th>
              <th style={{ border: '1px solid black'}}></th>
              <th style={{ border: '1px solid black'}}></th>
            </tr>

            <tr>
              <th style={{ border: '1px solid black'}}>2eme Sequence</th>
              <th style={{ border: '1px solid black'}}></th>
              <th style={{ border: '1px solid black'}}></th>
              <th style={{ border: '1px solid black'}}></th>
            </tr>

            <tr>
              <th style={{ border: '1px solid black'}}>3eme Sequence</th>
              <th style={{ border: '1px solid black'}}></th>
              <th style={{ border: '1px solid black'}}></th>
              <th style={{ border: '1px solid black'}}></th>
            </tr>
          </tbody>
        </table>

        <br />

        <p>Observation du trimestre .........................................................................
          ....................................................................................................
          ...................................................................................................
        </p>
        <p>Des efforts s'imposent en: ..............................................................................
          ......................................................................................................
        </p>
        </div>
      </div>

      
    </div>
  );
}